<script lang="ts">
    import { onMount } from "svelte";
    import { FHIR } from "../fhir";
    import { Link } from "svelte-routing";

    let data = [];
    onMount(async () => {
        const r = await FHIR.get("/Practitioner")
        console.log(r)
        data = r.data?.entry;
    });
</script>

<h1 class="text-4xl">Practitioners</h1>
<Link to="patient">
    <sl-button type="primary">New Practitioner</sl-button>
</Link>
<div>
    {#each data as practitioner}
        <p>
            <!-- svelte-ignore ally-missing-attribute -->
            <Link to={`practitioner/${practitioner.resource.id}`} class="text-blue-600 font-bold"> {practitioner.resource.name[0].given} </Link>
        </p>
{/each}
</div>
