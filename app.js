const sleep = (seconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};

const mockedDBCall = async ({
  callId,
  forceError = false,
  waitSeconds = 3,
}) => {
  await sleep(waitSeconds);
  if (forceError) {
    throw new Error(`${callId} failed!`);
  } else {
    return `Call ${callId} finished successfully`;
  }
};

const main = async () => {
  try {
    const startTime = Date.now();
    console.log("Call promises in loop:");
    for (i = 0; i < 3; i++) {
      const result = await mockedDBCall({ callId: i + 1 });
      console.log(result);
    }
    const timer1 = Date.now() - startTime;
    console.log(`Time elapsed: ${timer1} ms`);

    console.log("Call promises simultaneously with PromiseAll:");
    let values = await Promise.all([
      mockedDBCall({ callId: 1 }),
      mockedDBCall({ callId: 2 }),
      mockedDBCall({ callId: 3 }),
    ]);
    console.log(values);
    const timer2 = Date.now() - startTime - timer1;
    console.log(`Time elapsed: ${timer2} ms`);

    console.log("Call promises simultaneously with PromiseAllSettled:");
    values = await Promise.allSettled([
      mockedDBCall({ callId: 1 }),
      mockedDBCall({ callId: 2 }),
      mockedDBCall({ callId: 3, forceError: true }),
    ]);
    console.log(values);
    const timer3 = Date.now() - startTime - timer1 - timer2;
    console.log(`Time elapsed: ${timer2} ms`);
  } catch (err) {
    console.log(err);
  }
};

main();
