const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const sqs = new SQSClient();

const producer = async (event) => {
  let statusCode = 200;
  let message;

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No body was found",
      }),
    };
  }

  try {
    await sqs.send(new SendMessageCommand({
      QueueUrl: process.env.QUEUE_URL,
      MessageBody: event.body,
      MessageAttributes: {
        AttributeName: {
          StringValue: "Attribute Value",
          DataType: "String",
        },
      },
    }));

    message = "Message accepted!";
  } catch (error) {
    console.log(error);
    message = error;
    statusCode = 500;
  }

  return {
    statusCode,
    body: JSON.stringify({
      message,
    }),
  };
};

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const consumer = async (event) => {
  await delay(5000)
  for (const record of event.Records) {
    console.log("Message Body: ", record.body);

    let inputValue, outputValue;
    // TODO: Step 1을 참고하여, +1 를 하는 코드를 넣으세요
    if (record.body) {
      let body = JSON.parse(record.body);
      inputValue = parseInt(body);
      outputValue = inputValue + 1;
    }

    const message = `메시지를 받았습니다. 입력값: ${inputValue}, 결과: ${outputValue}`
    console.log(message);

  }
};

module.exports = {
  producer,
  consumer,
};