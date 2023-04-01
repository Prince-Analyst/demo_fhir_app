<script lang="ts">
    import { fhir } from "../fhir";

    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    export let ehrId;
    export let redirectUrl;
    let form;
    let encounter;
    let loading;
    onMount(async () => {
      const r = await FHIR.get(`/Encounter?subject=${ehrId}`);
      if (r?.data?.entry) {
        encounter = r?.data?.entry[0]?.resource;
        if (encounter) {
          form.import(encounter);
        }
      }
    });

    async function handleSubmit(e: CustomEvent) {
      loading = true;
      const data = e.detail;
      if (encounter) {
        await FHIR.put(`/Encounter/${encounter.id}`, {
          ...data,
          id: encounter.id,
        });
      } else {
        const r = await FHIR.post("Encounter", data);
      }
      loading = false;
      navigate(redirectUrl || `/clinical/${ehrId}`, { replace: true });
    }
  </script>

  <p class="my-5 text-xl font-semibold text-gray-700">Admission Details</p>
  <mb-FHIR-form
    bind:this={form}
    class="flex flex-col gap-3"
    on:mb-submit={handleSubmit}
  >
    <div class="hidden">
      <mb-context path="resourceType" data="Encounter" />
      <mb-context path="subject" data={{ reference: `Patient/${ehrId}` }} />
    </div>
    <mb-date path="period.start" label="Start" />
    <mb-date path="period.end" label="End" />

    <mb-select path="status" datatype="code" label="Status">
      <mb-option value="in-progress" label="Started" />
      <mb-option value="finished" label="Discharged" />
      <mb-option value="onleave" label="Discharged at Request" />
      <mb-option value="triaged" label="Referred" />
      <mb-option value="unknown" label="Expired" />
      <mb-option value="cancelled" label="Cancelled" />
    </mb-select>

    <mb-submit>
      <sl-button {loading} type="neutral" class="w-full">Save</sl-button>
    </mb-submit>
  </mb-FHIR-form>
