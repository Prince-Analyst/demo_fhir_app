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
    if (id){
        const resp = await FHIR.get(`/Patient/${id}`)
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


<h1 class="text-4xl text-purple-900 font-bold font-sans">Patient Registration</h1>
<mb-fhir-form 
    id="form"
    bind:this={form} 
    class="flex flex-col gap-3" 
    on:mb-submit={handleSubmit}
>
  <div class="field">
    <mb-context  path="resourceType" bind="Patient" />
    <!-- <mb-context path="resourceType" bind="Patient" /> -->
  </div>
  <br>
  <div class="field">
    <mb-checkbox type="boolean" path="active" label="Active"/>
    <!-- <mb-select type="boolean" label="Status" path="active"> -->
    <!--   <mb-option value="true" label="Active" /> -->
    <!--   <mb-option value="false" label="Inactive" /> -->
    <!-- </mb-select> -->
  </div>
  <div class="field">
    <mb-context type="HumanName" path="name[0].use[0]" bind="official" />
    <!-- <mb-select label="Type" path="name[0].use[0]" .bind=> -->
    <!--   <mb-option value="temp" label="Temp" /> -->
    <!--   <mb-option value="old" label="Old" /> -->
    <!--   <mb-option value="usual" label="Usual" /> -->
    <!--   <mb-option value="official" label="Official" /> -->
    <!--   <mb-option value="nickname" label="Name" /> -->
    <!--   <mb-option value="anonymous" label="Anonymous" /> -->
    <!--   <mb-option value="other" label="Other" /> -->
    <!-- </mb-select> -->
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
  <div class="field mb-5">
    <mb-date type="date" label="Date of Birth" placeholder="Date of Birth" path="birthDate" />
  </div>

  <div class="field">
    <mb-buttons type="code" label="Gender" placeholder="Gender" path="gender" >
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
    <mb-date type="dateTime" path="deceasedDateTime" placeholder="Date of Death" label="Date and Time of Death" />
  </div>
  <div class="field">
    <mb-context type="CodeableConcept" path="maritalStatus.coding.system" bind="http://terminology.hl7.org/CodeSystem/v3-MaritalStatus" />
  </div>
  <!-- <div> -->
  <!--   <mb-context path="maritalStatus[1].coding[0].code[0]" bind="S" /> -->
  <!-- </div> -->
  <br>
  <div class="field"> 
    <mb-select type="code" path="maritalStatus.coding" placeholder="Marital Status"> 
      <mb-option value="A" label="Annulled" /> 
      <mb-option value="D" label="Divorced" /> 
      <mb-option value="I" label="Interlocutory" /> 
      <mb-option value="L" label="Legally Separated" /> 
      <mb-option value="M" label="Married" /> 
      <mb-option value="C" label="Common Law" /> 
      <mb-option value="P" label="Polygamous" /> 
      <mb-option value="T" label="Domestic Partner" /> 
      <mb-option value="U" label="Unmarried" /> 
      <mb-option value="S" label="Never Married" /> 
      <mb-option value="W" label="Widowed" /> 
    </mb-select> 
  </div> 
  <!-- <div class="field"> -->
  <!--   <mb-context type="CodeableConcept" path="maritalStatus.text" bind:textContent={`maritalStatus.coding.code`} /> -->
  <!-- </div> -->
  <div class="field">
    <mb-context type="ContactPoint" path="telecom[0].system[0]" bind="phone">
    <!--   <mb-option value="email" label="Email" /> -->
    <!--   <mb-option value="phone" label="Phone" /> -->
    <!--   <mb-option value="fax" label="Fax" /> -->
    <!--   <mb-option value="pager" label="Pager" /> -->
    <!--   <mb-option value="sms" label="SMS" /> -->
    <!--   <mb-option value="other" label="Other" /> -->
    <!-- </mb-c> -->
  </div>

  <div class="field">
    <mb-context type="ContactPoint" path="telecom[0].use[0]" bind="mobile" />
    <!--   <mb-option value="home" label="Home" /> -->
    <!--   <mb-option value="work" label="Work" /> -->
    <!--   <mb-option value="temp" label="Temp" /> -->
    <!--   <mb-option value="old" label="Old" /> -->
    <!--   <mb-option value="mobile" label="Mobile" /> -->
    <!-- </mb-context> -->
  </div>
  <br>
  <div class="field">
    <mb-input type="ContactPoint" path="telecom[0].value[0]" placeholder="Phone Number" />
  </div>
  <div class="field">
    <mb-context type="ContactPoint" path="telecom[1].system[0]" bind="email">
    <!--   <mb-option value="email" label="Email" /> -->
    <!--   <mb-option value="phone" label="Phone" /> -->
    <!--   <mb-option value="fax" label="Fax" /> -->
    <!--   <mb-option value="pager" label="Pager" /> -->
    <!--   <mb-option value="sms" label="SMS" /> -->
    <!--   <mb-option value="other" label="Other" /> -->
    <!-- </mb-c> -->
  </div>
  <div class="field">
    <mb-context type="ContactPoint" path="telecom[1].use[0]" bind="mobile" />
    <!--   <mb-option value="home" label="Home" /> -->
    <!--   <mb-option value="work" label="Work" /> --> 
    <!--   <mb-option value="temp" label="Temp" /> -->
    <!--   <mb-option value="old" label="Old" /> -->
    <!--   <mb-option value="mobile" label="Mobile" /> -->
    <!-- </mb-context> -->
  </div>
  <br>
  <div class="field">
    <mb-input type="ContactPoint" path="telecom[1].value[0]" placeholder="Email Address" />
  </div>
  <!-- <mb-select type="code" path="telecom[1][1].system" label="Contact Type 2"> -->
  <!--   <mb-option value="email" label="Email" /> -->
  <!--   <mb-option value="phone" label="Phone" /> -->
  <!--   <mb-option value="fax" label="Fax" /> -->
  <!--   <mb-option value="pager" label="Pager" /> -->
  <!--   <mb-option value="sms" label="SMS" /> -->
  <!--   <mb-option value="other" label="Other" /> -->
  <!-- </mb-select> -->
  <!-- <mb-select type="code" path="telecom[1][2].use" label="Use"> -->
  <!--   <mb-option value="home" label="Home" /> -->
  <!--   <mb-option value="work" label="Work" /> -->
  <!--   <mb-option value="temp" label="Temp" /> -->
  <!--   <mb-option value="old" label="Old" /> -->
  <!--   <mb-option value="mobile" label="Mobile" /> -->
  <!-- </mb-select> -->
  <!-- <mb-input path="telecom[1][3].value" label="Value" /> -->
  <div class="field"> 
    <mb-context type="	Address" path="address[0].use" bind="home" />
  </div>
  <!--   <mb-option value="postal" label="Postal" /> -->
  <!--   <mb-option value="physical" label="Physical" /> -->
  <!--   <mb-option value="both" label="Both" /> -->
  <!-- </mb-context> -->
  <div class="field">
    <mb-context type="	Address" path="address[0].type" bind="both" />
  </div>
  <br>
  <div class="field" >
    <mb-input type="	Address" path="address[0].line" placeholder="Line" />
  </div>
  <br>
  <div class="field">
    <mb-input type="	Address" path="address[0].city" placeholder="City"/>
  </div>
  <br>
  <div class="field">
    <mb-input type="	Address" path="address[0].state" placeholder="State" />
  </div>
  <br>
  <div class="field">
    <mb-input type="	Address" path="address[0].postalCode" placeholder="Postal Code" />
  </div>
  <br>
  <div class="field">
    <mb-input type="	Address" path="address[0].country" placeholder="Country" />
  </div>
  <br>
  <div>
    <mb-submit>
      <sl-button {loading} class="text-blue-600 text-4xl font-bold" type="info">Submit</sl-button>
    </mb-submit>
  </div>
</mb-fhir-form>