<script>
    import { login } from "../auth";
    import "@shoelace-style/shoelace/dist/components/form/form";
    let username = "admin";
    let password = "admin";
    export let state;
  </script>

  <sl-form
    on:sl-submit={() => {
      login(username, password);
    }}
  >
    <div class="flex flex-col gap-4 max-w-lg m-auto">
      <h1 class="text-lg font-bold">Sign in</h1>
      <div>
      <sl-input
        value={username}
        placeholder="Username"
        on:sl-input={(/** @type {{ target: { value: string; }; }} */ e) => (username = e.target.value)}
      />
      </div>
      <br>
      <div>
      <sl-input
        type="password"
        value={password}
        toggle-password
        placeholder="Password"
        on:sl-input={(/** @type {{ target: { value: string; }; }} */ e) => (password = e.target.value)}
      />
      </div>
      <br>
      <sl-button submit type="neutral">Sign in</sl-button>

      {#if state}
        <p class="capitalize mt-5 text-red-600 font-semibold">
          {state} login
        </p>
      {/if}
    </div>
  </sl-form>
