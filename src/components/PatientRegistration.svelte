<script lang="ts" src="https://unpkg.com/medblocks-ui@0.0.82/dist/bundle.js">
  import 'medblocks-ui';
  import "medblocks-ui/dist/shoelace";
  import '@shoelace-style/shoelace/dist/themes/light.css';
  import './tailwind.css'
  import { FHIR, openehr } from '../fhir';
  import { onMount } from 'svelte';
  import { Link, navigate } from "svelte-routing";
  //import { expect, oneEvent } from '@open-wc copy/testing';
  //import { fixture } from '@open-wc copy/testing-helpers';
  //import { html } from 'lit-html';
  //import MbForm from '../fhirForm';

  let data = {}
  let loading: boolean = false;
  export let id = undefined;
  //export let ehrId = undefined;
  let form;
  console.log(id);
  async function handleSubmit(e: any){
    loading = true;

  document.addEventListener('DOMContentLoaded', () => {
    var form = document.getElementById('fhir-form');

    form.addEventListener('mb-submit', event => {console.log(e.detail)})

    });

    //const resp = await FHIR.post("/Patient", e.detail);
    //if (resp.status == 201) {
    //    ehrId = resp.data.id;
    //}
    //const respEHR = await openehr.put(`/ehr/${ehrId}`);

    if (id) {
        const resp = await FHIR.put(`/Patient/${id}`, { ...e.detail, id })
        //if (resp.status === 200) {
        //  const ehrId = resp.data.id;
        //  const respEHR = await openehr.put(`/ehr/${ehrId}/composition`)
        //}
        console.log(resp.data);
    } else {
        const resp = await FHIR.post("/Patient", e.detail);
        //if (resp.status === 201) {
        //  var ehrId = resp.data.id;
        //  const respEHR = await openehr.post(`/ehr/${ehrId}/composition`);
        //}
        console.log(resp.data);
    }
    loading = false;
  }

  onMount(async () => {
    if (id) {
      const r = await FHIR.get(`/Patient/${id}`);
      console.log(r.data);
      console.log(form.parse(r.data));
      data = form.parse(r.data);
    }
  });

  //onMount(async () => {
  //  if (id){
  //     const resp = await FHIR.get(`/Patient/${id}`)
  //      //if (resp.status === 200) {
  //      //  const ehrId = resp.data.id;
  //      //  const respEHR = await openehr.get(`/ehr/${ehrId}`);
  //      //}
  //      const resource = resp.data
  //      form.import(resource)
  //  }

  //})
  //};

</script>


<h1 class="text-2x font-semibold font-sans">Patient Registration</h1>
<mb-fhir-form
    id="form"
    bind:this={form}
    class="flex flex-col gap-3"
    {data}
    on:mb-input={(e) => {
      data = e.target.data;
    }}
    on:mb-submit={handleSubmit}
>
  <div class="field">
    <mb-input class="hidden"  path="resourceType" data="Patient" />
  </div>
  <br>
  <div class="field">
    <mb-checkbox type="boolean" path="active" label="Active" />
  </div>
  <div class="field">
    <mb-context type="HumanName" path="name[0].use[0]" bind="official" />
  </div>
  <br>
  <div class="field">
    <mb-input type="HumanName" path="name[0].prefix" placeholder="Prefix" />
  </div>
  <br>
  <div class="filed">
    <mb-input type="HumanName" path="name[0].given" placeholder="First Name" />
  </div>
  <br>
  <div class="field">
    <mb-input type="HumanName" path="name[0].family" placeholder="Last Name" />
  </div>
  <br>
  <div class="field">
    <mb-input type="HumanName" path="name[0].suffix" placeholder="Suffix" />
  </div>
  <br>
  <div class="field" >
    <mb-date type="date" label="Date of Birth" placeholder="Date of Birth" path="birthDate" />
  </div>
  <br>
  <div class="field">
    <mb-buttons datatype="code" path="gender" placeholder="Gender" >
      <mb-option value="male" label="Male" />
      <mb-option value="female" label="Female" />
      <mb-option value="other" label="Other" />
    </mb-buttons>
  </div>
  <br>
  <div class="field">
    <mb-checkbox type="boolean" path="deceasedBoolean" label="Deceased" />
  </div>
  <br>
  <div>
    <mb-date time type="dateTime" path="deceasedDateTime" placeholder="Date of Death" label="Date and Time of Death" />
  </div>
  <br>
  <div class="field">
    <mb-select type="code" path="maritalStatus.coding[0]" placeholder="Marital Status" >
      <mb-option value="A" label="Annulled" display="Annulled" />
      <mb-option value="D" label="Divorced" display="Divorced" />
      <mb-option value="I" label="Interlocutory" display="Interlocutory" />
      <mb-option value="L" label="Legally Separated" display="Legally Separated" />
      <mb-option value="M" label="Married" display="Married" />
      <mb-option value="C" label="Common Law" display="Common Law" />
      <mb-option value="P" label="Polygamous" display="Polygamous" />
      <mb-option value="T" label="Domestic Partner" display="Domestic Partner" />
      <mb-option value="U" label="Unmarried" display="Unmarried" />
      <mb-option value="S" label="Never Married" display="Never Married" />
      <mb-option value="W" label="Widowed" display="Widowed" />
    </mb-select>
  </div>
  <!-- <br> -->
  <!-- <div class="field"> -->
  <!--   <mb-context> -->
  <!--      -->
  <!--   </mb-context> -->
  <!-- </div> -->
  <!-- <br> -->
  <div class="field">
    <mb-context type="CodeableConcept" path="maritalStatus.coding[0].system[0]" bind="http://terminology.hl7.org/CodeSystem/v3-MaritalStatus" />
  </div>
  <div class="field">
    <mb-context type="ContactPoint" path="telecom[0].system[0]" bind="phone">
  </div>

  <div class="field">
    <mb-context type="ContactPoint" path="telecom[0].use[0]" bind="mobile" />
  </div>
  <br>
  <div class="field">
    <mb-input type="ContactPoint" path="telecom[0].value[0]" placeholder="Phone Number" />
  </div>
  <div class="field">
    <mb-context type="ContactPoint" path="telecom[1].system[0]" bind="email">
  </div>
  <div class="field">
    <mb-context type="ContactPoint" path="telecom[1].use[0]" bind="mobile" />
  </div>
  <br>
  <div class="field">
    <mb-input type="ContactPoint" path="telecom[1].value[0]" placeholder="Email Address" />
  </div>
  <br>
  <div class="field">
    <mb-context type="Address" path="address[0].use" bind="home" />
  </div>
  <div class="field">
    <mb-context type="Address" path="address[0].type" bind="physical" />
  </div>
  <div class="field" >
    <mb-input type="Address" path="address[0].line" placeholder="Line 1" />
  </div>
  <br>
  <div class="field" >
    <mb-input type="Address" path="address[0].line" placeholder="Line 2" />
  </div>
  <br>
  <div class="field">
    <mb-input type="Address" path="address[0].city" placeholder="City"/>
  </div>
  <br>
  <div class="field">
    <mb-input type="Address" path="address[0].state" placeholder="State" />
  </div>
  <br>
  <div class="field">
    <mb-input type="Address" path="address[0].postalCode" placeholder="Postal Code" />
  </div>
  <br>
  <div class="field">
    <mb-input type="Address" path="address[0].country" placeholder="Country" />
  </div>
  <!-- <br> -->
  <!-- <div> -->
  <!--   <mb-multimedia type="photo" label="Photo" path="photo" /> -->
  <!-- </div> -->
  <br>
  <div>
    <mb-submit>
      <sl-button {loading} class="text-blue-600 text-4xl font-bold" type="info">Submit</sl-button>
    </mb-submit>
  </div>
</mb-fhir-form>