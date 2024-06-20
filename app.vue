<script setup>
const isRunning = ref(false);

const handleClick = async () => {
  isRunning.value = true;
  console.log(isRunning.value);
  l1();

  longLoop();
  isRunning.value = false;
  console.log(isRunning.value);
}

const handleClickAsync = async () => {
  isRunning.value = true;
  console.log(isRunning.value);
  await l1();

  longLoop();
  isRunning.value = false;
  console.log(isRunning.value);
}

const handleClickAsyncFake = async () => {
  isRunning.value = true;
  console.log(isRunning.value);
  await l1Fake();

  longLoop();
  isRunning.value = false;
  console.log(isRunning.value);
}

const l1 = async () => {
  await new Promise((res) => {
    console.log('Timeout START');
    setTimeout(() => {
      console.log('Timeout END');
      res(true);
    }, 0);
  }).then(() => {
    longLoop();
  });
}

const l1Fake = async () => {
  await console.log('l1Fake');
  longLoop();
}

const longLoop = () => {
  console.log('longLoop START');
  for (let i = 0; i < 1_000_000_000; i++) { }
  console.log('longLoop END');
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
        <button @click="handleClickAsyncFake">Run Await Fake</button>
        <br><br>
        <div>
          Running?&nbsp;{{ isRunning }}
        </div>
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

button {
  cursor: pointer;
}
</style>
