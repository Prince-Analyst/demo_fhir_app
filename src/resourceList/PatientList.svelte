<script lang="ts">
    import { onMount } from "svelte";
    import { FHIR } from "../fhir";
    import { Link } from "svelte-routing";

    let data = [];
    onMount(async () => {
        const r = await FHIR.get("/Patient")
        console.log(r)
        data = r.data?.entry;
    });
</script>

<h1 class="text-4xl">Patients</h1>
<Link to="patient">
    <sl-button type="primary">New Patient</sl-button>
</Link>
<div>
    {#each data as patient}
        <p>
            <!-- svelte-ignore ally-missing-attribute -->
            <Link to={`patient/${patient.resource.id}`} class="text-blue-600 font-bold"> {patient.resource.name[0].given} </Link>
        </p>
{/each}
</div>
