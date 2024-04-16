import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 for generating UUIDs

describe('WalletService', () => {
  let app: INestApplication;
  const user_id = uuidv4();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return the correct balance when wallet is found', async () => {
    const response = await request(app.getHttpServer())
      .get(`/${user_id}/balance`)
      .expect(200);
    expect(response.body.message).toEqual({ balance: 500 });
  });

  it('should throw NotFoundException when wallet is not found', async () => {
    const user_id = uuidv4();
    const response = await request(app.getHttpServer())
      .get(`/${user_id}/balance`)
      .expect(422);
    expect(response.body.message).toEqual(
      `wallet for user with userId: ${user_id} not found`,
    );
  });

  it('should throw an error when user ID is invalid', async () => {
    const response = await request(app.getHttpServer())
      .get(`/'invalid'/balance`)
      .expect(422);
    expect(response.body.message).rejects.toThrow();
  });

  it('should update balance and return a transaction reference ID', async () => {
    const response = await request(app.getHttpServer())
      .post(`/${user_id}/money`)
      .send({ amount: 100 })
      .expect(200);
    expect(response.body.message).toEqual({
      referenece_id: 'e96a05f0-1fbf-417a-830d-82e24db73454',
    });
  });

  it('should throw NotFoundException when wallet is not found', async () => {
    const user_id = 'ecef9071-c0f2-4909-830e-cb271dbd463e';
    const amount = 100;
    const response = await request(app.getHttpServer())
      .post(`/${user_id}/money`)
      .send({ amount })
      .expect(422);
    expect(response.body.message).toEqual(
      `wallet for user with userId: ${user_id} not found`,
    );
  });

  it('should throw an error when user ID is invalid', async () => {
    const user_id = 'non-existent-user-id';
    const amount = 100;

    const response = await request(app.getHttpServer())
      .post(`/${user_id}/money`)
      .send({ amount })
      .expect(422);
    expect(response.body.message).rejects.toThrow();
  });
});
