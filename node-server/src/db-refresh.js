import models, { connectDb } from './models';

connectDb().then(async () => {
  await Promise.all([models.User.deleteMany(), models.Message.deleteMany()]);

  await createUsersWithMessages();
  console.log('db updated');
});

const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: 'user',
    email: 'user@test.com',
    password: 'test',
  });

  const user2 = new models.User({
    username: 'admin',
    email: 'admin@test.com',
    password: 'test',
    role: 'ADMIN',
  });

  const message1 = new models.Message({
    text: "user 1's message",
    createdAt: Date.now(),
    userId: user1.id,
  });

  const message2 = new models.Message({
    text: "user 1's second message",
    createdAt: Date.now(),
    userId: user1.id,
  });

  const message3 = new models.Message({
    text: "admin's message",
    createdAt: Date.now(),
    userId: user2.id,
  });

  await message1.save();
  await message2.save();
  await message3.save();

  await user1.save();
  await user2.save();
};
