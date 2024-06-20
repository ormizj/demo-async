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

const l1 = async () => {
  await new Promise((res) => {
    console.log('Timeout START');
    setTimeout(() => {
      res(true);
      console.log('Timeout END');
    }, 3000);
  }).then(() => {
  });
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
