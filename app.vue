<script setup>
const isRunning = ref(false);

// WITH $fetch
const handleClick = async () => {
  isRunning.value = true;
  console.log(isRunning.value);
  asyncFunction();

  longLoop('handleClick');
  isRunning.value = false;
  console.log(isRunning.value);
}

const handleClickAsync = async () => {
  isRunning.value = true;
  console.log(isRunning.value);
  await asyncFunction();

  longLoop('handleClickAsync');
  isRunning.value = false;
  console.log(isRunning.value);
}

const handleClickAsyncDelay = async () => {
  isRunning.value = true;
  console.log(isRunning.value);
  await asyncFunction();

  longLoop('handleClickAsyncDelay');
  isRunning.value = false;
  console.log(isRunning.value);
}

// WITHOUT $fetch
const handleClickFake = async () => {
  isRunning.value = true;
  console.log(isRunning.value);
  asyncFunctionFake();

  longLoop('handleClickFake');
  isRunning.value = false;
  console.log(isRunning.value);
}

const handleClickAsyncFake = async () => {
  isRunning.value = true;
  console.log(isRunning.value);
  await asyncFunctionFake();

  longLoop('handleClickAsyncFake');
  isRunning.value = false;
  console.log(isRunning.value);
}

// async functions
const asyncFunction = async (delay = 0) => {
  console.log('asyncFunction START');
  // await $fetch(`${window.location.protocol}//${window.location.host}/api/delayed-fetch`);
  await asyncTimeout();

  // https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask
  // queueMicrotask(() => {
  //   console.log('microtask');
  // })

  longLoop('asyncFunction');
  console.log('asyncFunction END');
}

const asyncTimeout = (seconds = 0) => {
  return new Promise((res) => {
    console.log('asyncTimeout START');
    setTimeout(() => {
      console.log('asyncTimeout END');
      res();
    });
  });
}

const asyncFunctionFake = async () => {
  console.log('asyncFunctionFake START');
  await (() => { });
  longLoop('asyncFunctionFake');
  console.log('asyncFunctionFake END')
}

const longLoop = (callerName) => {
  console.log(`longLoop (${callerName}) START`);
  const endTime = Date.now() + 1000;
  while (Date.now() < endTime) { }
  console.log(`longLoop (${callerName}) END`);
}
</script>

<template>
  <div class="main">
    <div class="centered">
      <div>
        <button @click="handleClick">Run</button>
        &nbsp;
        <button @click="handleClickAsync">Run Await</button>
        &nbsp;
        <button @click="handleClickAsyncDelay">Run Await Delay</button>
        <br><br>
        <button @click="handleClickFake">Run Fake</button>
        &nbsp;
        <button @click="handleClickAsyncFake">Run Await Fake</button>
        <br><br>
        <div class="status">
          Running?&nbsp;{{ `${isRunning}`.toUpperCase() }}
        </div>
        <br><br><br>
        <button @click="() => console.clear()">Clear Logs</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  background-color: rgb(25, 25, 25);
  position: fixed;
  top: 0;
  left: 0
}

.centered {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.status {
  font-size: larger;
}

button {
  cursor: pointer;
}
</style>
