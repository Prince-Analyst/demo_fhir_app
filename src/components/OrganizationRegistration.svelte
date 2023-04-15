<script lang="ts" src="https://unpkg.com/medblocks-ui@0.0.82/dist/bundle.js">
  import 'medblocks-ui';
  import "medblocks-ui/dist/shoelace";
  import '@shoelace-style/shoelace/dist/themes/light.css';
  import './tailwind.css'
  import { FHIR, openehr } from '../fhir';
  import { onMount } from 'svelte';
  //import { expect, oneEvent } from '@open-wc copy/testing';
  //import { fixture } from '@open-wc copy/testing-helpers';
  //import { html } from 'lit-html';
  //import MbForm from '../fhirForm';

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

    //const resp = await FHIR.post("/Organization", e.detail);
    //if (resp.status == 201) {
    //    ehrId = resp.data.id;
    //}
    //const respEHR = await openehr.put(`/ehr/${ehrId}`);

    if (id) {
        const resp = await FHIR.put(`/Organization/${id}`, { ...e.detail, id })
        //if (resp.status === 200) {
        //  const ehrId = resp.data.id;
        //  const respEHR = await openehr.put(`/ehr/${ehrId}/composition`)
        //}
        console.log(resp.data);
    } else {
        const resp = await FHIR.post("/Organization", e.detail);
        //if (resp.status === 201) {
        //  var ehrId = resp.data.id;
        //  const respEHR = await openehr.post(`/ehr/${ehrId}/composition`);
        //}
        console.log(resp.data);
    }
    loading = false;
  }

  onMount(async () => {
    if (id){
        const resp = await FHIR.get(`/Organization/${id}`)
        //if (resp.status === 200) {
        //  const ehrId = resp.data.id;
        //  const respEHR = await openehr.get(`/ehr/${ehrId}`);
        //}
        const resource = resp.data
        form.import(resource)
    }

  })
  //};

</script>


<h1 class="text-2x font-semibold font-sans">Organization Registration</h1>
<mb-fhir-form
    id="form"
    bind:this={form}
    class="flex flex-col gap-3"
    on:mb-submit={handleSubmit}
>
  <div class="field">
    <mb-context  path="resourceType" bind="Organization" />
  </div>
  <br>
  <div class="field">
    <mb-checkbox type="boolean" path="active" label="Active" />
  </div>
  <mb-context path="type[0].coding[0].system[0]" bind="http://terminology.hl7.org/CodeSystem/organization-type" />
  <br>
  <div>
    <mb-text-select type="code" path="type[0].coding[0].code" placeholder="Organization Type" >
        <mb-option value="team" display="team" label="Team" />
        <mb-option value="crs" display="Clinical Research Sponsor" label="Clinical Research Sponsor" />
        <mb-option value="cg" display="Community Group" label="Community Group" />
        <mb-option value="edu" display="Educational Institute" label="Educational Institute" />
        <mb-option value="govt" display="Government" label="Government" />
        <mb-option value="prov" display="Healthcare Provider" label="Healthcare Provider" />
    </mb-text-select>
  </div>
  <br>
  <div class="field" >
    <mb-input path="name" placeholder="Name"/>
  </div>
  <br>
  <div class="field" >
    <mb-input path="alias[0]" placeholder="Alias" />
  </div>
  <br>
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
  <!-- <br> -->
  <div class="field">
    <mb-context type="Address" path="address[0].type" bind="physical" />
  </div>
  <!-- <br> -->
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
  <br>
  <div class="field" >
    <mb-select type="code" path="contact.purpose[0].coding[0]" placeholder="Contact Type">
      <mb-option value="ADMIN" display="Administrative" label="Administrative" />
      <mb-option value="BILL" display="Billing" label="Billing" />
      <mb-option value="HR" display="Human Resources" label="Human Resources" />
      <mb-option value="PATINF" display="Organization" label="Organization" />
      <mb-option value="PAYOR" display="Payor" label="Payor" />
    </mb-select>
  </div>
  <div class="field">
    <mb-context path="contact.purpose[0].coding[0].system[0]" bind="http://terminology.hl7.org/CodeSystem/contactentity-type" /> 
  </div>
  <div class="field">
    <mb-context type="HumanName" path="contact.name[0].use[0]" bind="official" />
  </div>
  <br>
  <div class="field">
    <mb-input type="HumanName" path="contact.name[0].prefix" placeholder="Prefix" />
  </div>
  <br>
  <div class="filed">
    <mb-input type="HumanName" path="contact.name[0].given" placeholder="First Name" />
  </div>
  <br>
  <div class="field">
    <mb-input type="HumanName" path="contact.name[0].family" placeholder="Last Name" />
  </div>
  <br>
  <div class="field">
    <mb-input type="HumanName" path="contact.name[0].suffix" placeholder="Suffix" />
  </div>
  <br>
  <div class="field">
    <mb-context type="cAddress" path="contact.address[0].use" bind="home" />
  </div>
  <div class="field">
    <mb-context type="Address" path="contact.address[0].type" bind="physical" />
  </div>
  <div class="field" >
    <mb-input type="Address" path="contact.address[0].line" placeholder="Line 1" />
  </div>
  <br>
  <div class="field" >
    <mb-input type="Address" path="contact.address[0].line" placeholder="Line 2" />
  </div>
  <br>
  <div class="field">
    <mb-input type="Address" path="contact.address[0].city" placeholder="City"/>
  </div>
  <br>
  <div class="field">
    <mb-input type="Address" path="contact.address[0].state" placeholder="State" />
  </div>
  <br>
  <div class="field">
    <mb-input type="Address" path="contact.address[0].postalCode" placeholder="Postal Code" />
  </div>
  <br>
  <div class="field">
    <mb-input type="Address" path="contact.address[0].country" placeholder="Country" />
  </div>
  <br>
  <div>
    <mb-submit>
      <sl-button {loading} class="text-blue-600 text-4xl font-bold" type="info">Submit</sl-button>
    </mb-submit>
  </div>
</mb-fhir-form>