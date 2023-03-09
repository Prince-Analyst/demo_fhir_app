<script lang="ts">
    import 'medblocks-ui';
    import '@shoelace-style/shoelace/dist/themes/light.css';
    import './tailwind.css';
    import { FHIR, openehr } from '../fhir';
  
    import { onMount } from 'svelte';
  
    let loading: boolean = false;
    export let id = undefined;
    let form;
    console.log(id);
    async function handleSubmit(e: any){
      loading = true;
      if (id) {
          const r = await FHIR.put(`/Practitioner/${id}`, { ...e.detail, id })
          console.log(r.data);
      } else {
          const r = await FHIR.post("/Practitioner", e.detail)
          console.log(r.data);
      }
      loading = false;
    }
  
    onMount(async () => {
      if (id){
          const r = await FHIR.get(`/Practitioner/${id}`)
          const resource = r.data
          form.import(resource)
      }
    });
  
  </script>
  
  
  
  <h1 class="text-2x font-semibold font-sans">Patient Registration</h1>
  <mb-fhir-form 
      id="form"
      bind:this={form} 
      class="flex flex-col gap-3" 
      on:mb-submit={handleSubmit}
  >
    <div class="field">
      <mb-context  path="resourceType" bind="Practitioner" />
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
    <div class="field mb-5">
      <mb-date type="date" label="Date of Birth" placeholder="Date of Birth" path="birthDate" />
    </div>
    <br>
    <div class="field">
      <mb-buttons type="code" label="Gender" path="gender" >
        <mb-option value="male" label="Male" />
        <mb-option value="female" label="Female" />
        <mb-option value="other" label="Other" />
      </mb-buttons>
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
    <div class="field"> 
      <mb-context type="	Address" path="address[0].use" bind="home" />
    </div>
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