<script>
  import { theme } from '../store'

  /**
   * Change color mode
   */
  const changeColorMode = () => {
    if ($theme === 'light') {
      theme.set('dark')
    } else {
      theme.set('light')
    }
  }
</script>

<div class="color-mode" style="width: 32px; height: 32px;" on:click={changeColorMode}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    preserveAspectRatio="xMidYMid meet"
    class="dark-part"
    style="vertical-align: middle;"
  >
    <g>
      <path
        d="M8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2Z"
      />
    </g>
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    preserveAspectRatio="xMidYMid meet"
    class="light-part"
    style="vertical-align: middle;"
  >
    <g>
      <path
        d="M8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2Z"
      />
    </g>
  </svg>
</div>

<style>
  .color-mode {
    background-color: var(--n0);
    display: inline-flex;
    outline: 0;
    transition: all 0.13s ease-in-out;
    transition: var(--transition);
    cursor: pointer;
    position: relative;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid var(--n150);
    border-radius: 7px;
    position: fixed;
    bottom: 15px;
    right: 15px;
    height: 20px;
    width: 20px;
  }

  .dark-part {
    position: absolute;
    bottom: 6px;
    right: 6px;
    z-index: 1;
    -webkit-animation: dark-part-animation-out 0.4s linear;
    animation: dark-part-animation-out 0.4s linear;
    fill: var(--n600);
  }

  .color-mode:hover .dark-part {
    -webkit-animation: dark-part-animation-in 0.4s linear;
    animation: dark-part-animation-in 0.4s linear;
    transform: translate(-4px, -4px);
    z-index: 2;
  }

  .light-part {
    position: absolute;
    top: 6px;
    left: 6px;
    z-index: 2;
    -webkit-animation: light-part-animation-out 0.4s linear;
    animation: light-part-animation-out 0.4s linear;
    fill: var(--n400);
  }

  .color-mode:hover .light-part {
    -webkit-animation: light-part-animation-in 0.4s linear;
    animation: light-part-animation-in 0.4s linear;
    transform: translate(4px, 4px);
    z-index: 1;
  }

  @-webkit-keyframes light-part-animation-in {
    0% {
      transform: translate(0);
      z-index: 2;
    }
    60% {
      transform: translate(8px, 8px);
      z-index: 2;
    }
    80% {
      z-index: 1;
    }
    to {
      transform: translate(4px, 4px);
      z-index: 1;
    }
  }

  @keyframes light-part-animation-in {
    0% {
      transform: translate(0);
      z-index: 2;
    }
    60% {
      transform: translate(8px, 8px);
      z-index: 2;
    }
    80% {
      z-index: 1;
    }
    to {
      transform: translate(4px, 4px);
      z-index: 1;
    }
  }

  @-webkit-keyframes light-part-animation-out {
    0% {
      transform: translate(4px, 4px);
      z-index: 1;
    }
    60% {
      transform: translate(8px, 8px);
      z-index: 1;
    }
    80% {
      z-index: 2;
    }
    to {
      transform: translate(0);
      z-index: 2;
    }
  }

  @keyframes light-part-animation-out {
    0% {
      transform: translate(4px, 4px);
      z-index: 1;
    }
    60% {
      transform: translate(8px, 8px);
      z-index: 1;
    }
    80% {
      z-index: 2;
    }
    to {
      transform: translate(0);
      z-index: 2;
    }
  }

  @-webkit-keyframes dark-part-animation-in {
    0% {
      transform: translate(0);
      z-index: 1;
    }
    60% {
      transform: translate(-8px, -8px);
      z-index: 1;
    }
    80% {
      z-index: 2;
    }
    to {
      transform: translate(-4px, -4px);
      z-index: 2;
    }
  }

  @keyframes dark-part-animation-in {
    0% {
      transform: translate(0);
      z-index: 1;
    }
    60% {
      transform: translate(-8px, -8px);
      z-index: 1;
    }
    80% {
      z-index: 2;
    }
    to {
      transform: translate(-4px, -4px);
      z-index: 2;
    }
  }

  @-webkit-keyframes dark-part-animation-out {
    0% {
      transform: translate(-4px, -4px);
      z-index: 2;
    }
    60% {
      transform: translate(-8px, -8px);
      z-index: 2;
    }
    80% {
      z-index: 1;
    }
    to {
      transform: translate(0);
      z-index: 1;
    }
  }

  @keyframes dark-part-animation-out {
    0% {
      transform: translate(-4px, -4px);
      z-index: 2;
    }
    60% {
      transform: translate(-8px, -8px);
      z-index: 2;
    }
    80% {
      z-index: 1;
    }
    to {
      transform: translate(0);
      z-index: 1;
    }
  }
</style>
