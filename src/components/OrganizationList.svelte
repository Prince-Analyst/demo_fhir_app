<script lang="ts">
    import { onMount } from "svelte";
    import { FHIR } from "../fhir";
    import { Link } from "svelte-routing";

    let data = [];
    onMount(async () => {
        const r = await FHIR.get("/Organization")
        console.log(r)
        data = r.data?.entry;
    });
</script>

<h1 class="text-4xl">Patients</h1>
<Link to="organization">
    <sl-button type="primary">New Organization</sl-button>
</Link>
<div>
    {#each data as organization}
        <p>
            <!-- svelte-ignore ally-missing-attribute -->
            <Link to={`organization/${organization.resource.id}`} class="text-blue-600 font-bold"> {organization.resource.name} </Link>
        </p>
{/each}
</div>
