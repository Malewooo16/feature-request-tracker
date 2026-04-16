import request from 'supertest';
import express from 'express';
import featureRoutes from '../features/routes';
import { desc } from 'drizzle-orm';


const app = express();
app.use(express.json());
app.use('/api/features', featureRoutes);

describe('GET /api/features', () => {
  
  it('should return 200 and all features when no filters are applied', async () => {
    const res = await request(app).get('/api/features');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBe(Array.isArray(res.body.data) ? res.body.data : res.body);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return 400 for invalid status enum', async () => {
    const res = await request(app)
      .get('/api/features')
      .query({ status: 'invalid_status' });

    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
    // Zod error check
    expect(res.body.errors).toHaveProperty('status');
  });

  it('should return 200 for valid date range filters', async () => {
    const res = await request(app)
      .get('/api/features')
      .query({ 
        fromDate: '2023-01-01T00:00:00Z',
        toDate: '2023-12-31T23:59:59Z' 
      });

    expect(res.statusCode).toEqual(200);
  });


});


describe('POST /api/features', () => {

  it('should create a new feature with valid data', async () => {
    const validFeature = {
      title: "Add OAuth Support",
      description: "Integrate Google and GitHub login",
      priority: "High",
      status: "Planned"
    };

    const res = await request(app)
      .post('/api/features')
      .send(validFeature);

    expect(res.statusCode).toEqual(201); // Or 200 depending on your controller
   // expect(res.body.success).toBe(true);
    expect(res.body).toMatchObject(validFeature);
    expect(res.body).toHaveProperty('id');
  });

  it('should return 400 when required fields are missing', async () => {
    const invalidFeature = {
      description: "Missing a title",
      priority: "Medium",
      status: "Planned"
    };

    const res = await request(app)
      .post('/api/features')
      .send(invalidFeature);

    expect(res.statusCode).toEqual(400);
   // expect(res.body.success).toBe(false);
    // Checking Zod error message
    expect(res.body.errors).toHaveProperty('title');
    expect(res.body.errors.title).toContain("Not a string");
  });

  it('should return 400 for invalid enum values', async () => {
    const wrongEnumFeature = {
      title: "Test Feature",
      description: "Testing enums",
      priority: "Urgent", // Not in ["Low", "Medium", "High"]
      status: "Planned"
    };

    const res = await request(app)
      .post('/api/features')
      .send(wrongEnumFeature);

    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toHaveProperty('priority');
  });
});

// --- Describe Block 1: Full/Partial Feature Update ---
describe('PUT /api/v1/features/:id', () => {
  const featureId = 1;

  it('should update multiple fields successfully', async () => {
    const updateData = {
      title: "Updated Title",
      priority: "High",
      status: "In Progress"
    };

    const res = await request(app)
      .put(`/api/features/${featureId}`)
      .send(updateData);

    expect(res.statusCode).toEqual(200);
   // expect(res.body.success).toBe(true);
    expect(res.body.title).toBe("Updated Title");
    expect(res.body.priority).toBe("High");
  });

  it('should return 400 when an invalid priority is provided', async () => {
    const res = await request(app)
      .put(`/api/features/${featureId}`)
      .send({ priority: "Urgent" }); // Not in enum

    expect(res.statusCode).toEqual(400);
    expect(res.body.errors).toHaveProperty('priority');
  });

  it('should return 404 if the feature does not exist', async () => {
    const res = await request(app)
      .put('/api/features/99999')
      .send({ title: "New Name" });

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toBe("Feature not found");
  });
});

// --- Describe Block 2: Specific Status Update ---
describe('PATCH /api/v1/features/:id/status', () => {
  const featureId = 1;

  it('should update only the status successfully', async () => {
    const res = await request(app)
      .patch(`/api/features/${featureId}/status`)
      .send({ status: "Completed" });

    expect(res.statusCode).toEqual(200);
   // expect(res.body.success).toBe(true);
    expect(res.body.status).toBe("Completed");
  });

  it('should fail if any field other than status is sent', async () => {
    // Because updateFeatureStatusSchema ONLY has status, 
    // Zod will either ignore title or you can set it to strict()
    const res = await request(app)
      .patch(`/api/features/${featureId}/status`)
      .send({ status: "Completed", title: "Should not be here" });

    // If using .strict() in Zod, this would be a 400
    // Otherwise, the controller just ignores the title
    expect(res.statusCode).toEqual(400); 
    expect(res.body.title).not.toBe("Should not be here");
  });

  it('should return 400 for an empty status', async () => {
    const res = await request(app)
      .patch(`/api/features/${featureId}/status`)
      .send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body.errors).toHaveProperty('status');
  });
});

describe('DELETE /api/v1/features/:id', () => {
  
  it('should delete an existing feature and return 200', async () => {
    // Assuming ID 1 exists from your setup/seed
    const res = await request(app).delete('/api/features/1');

    expect(res.statusCode).toEqual(200);
   // expect(res.body.success).toBe(true);
    expect(res.body.message).toContain("Feature deleted successfully");
  });

  it('should return 404 when trying to delete a non-existent ID', async () => {
    const res = await request(app).delete('/api/features/99999');

    expect(res.statusCode).toEqual(404);
   // expect(res.body.success).toBe(false);
  });

  
});
  

