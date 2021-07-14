<script>
  export let version
</script>

<header style="-webkit-app-region: drag">
  <div class="app-title-version">Saila {version}</div>
</header>

<style>
  header {
    height: 36px;
    background-color: var(--n100);
    border-bottom: 1px solid var(--n150);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 13px;
  }

  .app-title-version {
    font-size: 12px;
    color: var(--n400);
    font-weight: 600;
  }
</style>
