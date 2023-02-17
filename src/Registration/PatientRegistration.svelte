<script lang="ts">
  import 'medblocks-ui';
  import "medblocks-ui/dist/shoelace";
  import '@shoelace-style/shoelace/dist/themes/light.css';
  import './tailwind.css'
  import { FHIR, openehr } from '../fhir';
  import { onMount } from 'svelte';

  let loading: boolean = false;
  export let id = undefined;
  export let ehrId = undefined;
  let form;
  console.log(id);
  async function handleSubmit(e: any){
    loading = true;

    const resp = await FHIR.post("/Patient", e.detail);
    if (resp.status == 201) {
        ehrId = resp.data.id;
    }
    const respEHR = await openehr.put(`/ehr/${ehrId}`);

    //if (id) {
    //    const resp = await FHIR.put(`/Patient/${id}`, { ...e.detail, id })
    //    //if (resp.status === 200) {
    //    //  const ehrId = resp.data.id;
    //    //  const respEHR = await openehr.put(`/ehr/${ehrId}`)
    //    //}
    //    console.log(resp.data);
    //} else {
    //    const resp = await FHIR.post("/Patient", e.detail);
    //    if (resp.status === 201) {
    //      var ehrId = resp.data.id;
    //      const respEHR = await openehr.put(`/ehr/${ehrId}`);
    //    }
    //    console.log(resp.data);
    //}
    loading = false;
  }

  onMount(async () => {
    if (id){
        const resp = await FHIR.get(`/Patient/${id}`)
        //if (resp.status === 200) {
        //  const ehrId = resp.data.id;
        //  const respEHR = await openehr.get(`/ehr/${ehrId}`);
        //}
        const resource = resp.data
        //form.import(resource)
    }

  });

</script>


<h1 class="text-4xl text-purple-900 font-bold font-sans">Patient Registration</h1>
<mb-fhir-form 
    id="form"
    bind:this={form} 
    class="flex flex-col gap-3" 
    on:mb-submit={handleSubmit}
>
  <mb-input path="resourceType" label="Resource Type" />
  <mb-select type="code" label="Status" path="active">
    <mb-option value="true" label="Active" />
    <mb-option value="false" label="Inactive" />
  </mb-select>
  <mb-select type="code" label="Type" path="name[0].use">
    <mb-option value="temp" label="Temp" />
    <mb-option value="old" label="Old" />
    <mb-option value="usual" label="Usual" />
    <mb-option value="official" label="Official" />
    <mb-option value="nickname" label="Name" />
    <mb-option value="anonymous" label="Anonymous" />
    <mb-option value="other" label="Other" />
  </mb-select>
  <mb-input path="name[3].prefix" label="Prefix" />
  <mb-input path="name[1].given" label="First Name" />
  <mb-input path="name[2].family" label="Last Name" />
  <mb-input path="name[4].suffix" label="Suffix" />
  <mb-date label="Date of Birth" path="birthDate" />
  <mb-buttons type="code" label="Gender" path="gender" >
    <mb-option value="male" label="Male" />
    <mb-option value="female" label="Female" />
    <mb-option value="other" label="Other" />
  </mb-buttons>
  <mb-select type="code" path="telecom[0][1].system" label="Contact Type 1">
    <mb-option value="email" label="Email" />
    <mb-option value="phone" label="Phone" />
    <mb-option value="fax" label="Fax" />
    <mb-option value="pager" label="Pager" />
    <mb-option value="sms" label="SMS" />
    <mb-option value="other" label="Other" />
  </mb-select>
  <mb-select type="code" path="telecom[0][2].use" label="Use">
    <mb-option value="home" label="Home" />
    <mb-option value="work" label="Work" />
    <mb-option value="temp" label="Temp" />
    <mb-option value="old" label="Old" />
    <mb-option value="mobile" label="Mobile" />
  </mb-select>
  <mb-input path="telecom[0][3].value" label="Value" />
  <mb-select type="code" path="telecom[1][1].system" label="Contact Type 2">
    <mb-option value="email" label="Email" />
    <mb-option value="phone" label="Phone" />
    <mb-option value="fax" label="Fax" />
    <mb-option value="pager" label="Pager" />
    <mb-option value="sms" label="SMS" />
    <mb-option value="other" label="Other" />
  </mb-select>
  <mb-select type="code" path="telecom[1][2].use" label="Use">
    <mb-option value="home" label="Home" />
    <mb-option value="work" label="Work" />
    <mb-option value="temp" label="Temp" />
    <mb-option value="old" label="Old" />
    <mb-option value="mobile" label="Mobile" />
  </mb-select>
  <mb-input path="telecom[1][3].value" label="Value" />
  <mb-select type="code" path="address[0].type" label="Address Use" >
    <mb-option value="postal" label="Postal" />
    <mb-option value="physical" label="Physical" />
    <mb-option value="both" label="Both" />
  </mb-select>
  <mb-input path="address[0][1].line" label="Line" />
  <mb-input path="address[0][2].city" label="City" />
  <mb-input path="address[0][3].state" label="State" />
  <mb-input path="address[0][4].postalCode" label="Postal Code" />
  <mb-input path="address[0][5].country" label="Country" />
  <mb-submit>
    <sl-button {loading} class="text-blue-600 text-4xl font-bold" type="info">Submit</sl-button>
  </mb-submit>
</mb-fhir-form>