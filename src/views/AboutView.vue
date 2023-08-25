<template>
  <div class="about">
    <h1>This is an about page 1234</h1>
  </div>
</template>

<style scoped lang="scss">
.about {
  h1 {
    text-align: center;
    font-family: 'DS-Digital';
  }
}

@media (min-width: 1024px) {
  .about {
    /* min-height: 100vh; */
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      background: black;
      content: '';
      display: inline-block;
      height: 10px;
      width: 10px;
    }
  }
}
</style>
