<script lang="ts" >
  import "medblocks-ui/dist/medblocks";
  import { onMount } from "svelte";
  import { fhir, openehr  } from "../fhir";
  import { Link, navigate } from "svelte-routing";

  let data = {};
  let form;
  let loading = false;
  export let id;
  export let ehrId;
  export let resp;

  onMount(async () => {
    if (id) {
      const r = await fhir.get(`/Patient/${id}`);
      console.log(r.data);
      console.log(form.parse(r.data));
      data = form.parse(r.data);
    }
  });
  const handleSubmit = async (e: any) => {
    const data = e.detail;
    console.log(data);
    if (id) {
      loading = true;
      await fhir.put(`/Patient/${id}`, { ...data, id });
      loading = false;
    } else {
      loading = true;
      await fhir.post(`/Patient`, data);
      if (resp.status == 201) {
      ehrId = resp.data.id;
        }
      const respEHR = await openehr.put(`/ehr/${ehrId}`);
      loading = false;
    }
    navigate("/", { replace: true });
  };
</script>


<h1 class="text-2x font-semibold font-sans">Patient Registration</h1>
<mb-fhir-form
  class="flex flex-col gap-3"
  {data}
  bind:this={form}
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
    <label for="" class="font-bold">Patient information</label>
  </div>
  <div class="field">
    <mb-checkbox type="boolean" path="active" label="Active" />
  </div>
  <div class="field">
    <mb-select datatype="code" label="Identifier type" path="identifier[0].system">
      <mb-option value="passport" label="Passport Number" />
      <mb-option value="driving" label="Driving License" />
      <mb-option value="nin" label="National Identity Number" />
      <mb-option value="voter" label="Voter ID" />
    </mb-select>
  </div>
  <div class="field">
    <mb-input path="identifier[0].value" label="Identifier number" />
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
  <div class="field">
    <mb-buttons datatype="code" label="Gender" path="gender">
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
  <div class="field">
    <mb-context type="CodeableConcept" path="maritalStatus.coding[0].system[0]" bind="http://terminology.hl7.org/CodeSystem/v3-MaritalStatus" />
  </div>
  <div class="field">
    <mb-context type="ContactPoint" path="telecom[0].system" bind="phone">
  </div>
  <div class="field">
    <mb-context type="ContactPoint" path="telecom[0].use" bind="mobile" />
  </div>
  <br>
  <div class="field">
    <mb-input type="ContactPoint" path="telecom[0].value" placeholder="Phone Number" />
  </div>
  <div>
    <mb-context type="ContactPoint" path="telecom[1].system" bind="email">
  </div>
  <div class="field">
    <mb-context type="ContactPoint" path="telecom[1].use" bind="mobile" />
  </div>
  <br>
  <div class="field">
    <mb-input type="ContactPoint" path="telecom[1].value" placeholder="Email Address" />
  </div>
  <br>
  <div class="field">
    <mb-input label="Address" textarea path="address[0].text" placeholder="Full Address"/>
  </div>
  <br>
  <div class="field">
    <mb-input label="Address" textarea path="address[0].text" placeholder="Full Address"/>
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
  <div class="field">
    <label for="" class="font-bold">Attendant information</label>
  </div>
  <div class="field">
    <mb-checkbox type="boolean" path="contact[0].active" label="Active" />
  </div>
  <div class="field">
    <mb-context type="HumanName" path="contact[0].name[0].use[0]" bind="official" />
  </div>
  <br>
  <div class="field">
    <mb-input type="HumanName" path="contact[0].name[0].prefix" placeholder="Prefix" />
  </div>
  <br>
  <div class="filed">
    <mb-input type="HumanName" path="contact[0].name[0].given" placeholder="First Name" />
  </div>
  <br>
  <div class="field">
    <mb-input type="HumanName" path="contact[0].name[0].family" placeholder="Last Name" />
  </div>
  <br>
  <div class="field">
    <mb-input type="HumanName" path="contact[0].name[0].suffix" placeholder="Suffix" />
  </div>
  <br>
  <div class="field">
    <mb-select
      label="Attendant relationship"
      path="contact[0].relationship[0]"
      datatype="CodableConcept"
    >
      <mb-option value="mother" label="Mother" />
      <mb-option value="father" label="Father" />
      <mb-option value="daughter" label="Daughter" />
      <mb-option value="son" label="Son" />
      <mb-option value="brother" label="Brother" />
      <mb-option value="sister" label="Sister" />
      <mb-option value="husband" label="Husband" />
      <mb-option value="wife" label="Wife" />
      <mb-option value="neighbor" label="Neighbor" />
      <mb-option value="other" label="Other" />
    </mb-select>
  </div>
  <br>
  <div class="field">
    <mb-context type="ContactPoint" path="contact[0].telecom[0].system" bind="phone">
  </div>
  <div class="field">
    <mb-context type="ContactPoint" path="contact[0].telecom[0].use" bind="mobile" />
  </div>
  <br>
  <div class="field">
    <mb-input type="ContactPoint" path="contact[0].telecom[0].value" placeholder="Phone Number" />
  </div>
  <div class="field">
    <mb-context type="ContactPoint" path="contact[0].telecom[1].system" bind="email">
  </div>
  <div class="field">
    <mb-context type="ContactPoint" path="contact[0].telecom[1].use" bind="mobile" />
  </div>
  <br>
  <div class="field">
    <mb-input type="ContactPoint" path="contact[0].telecom[1].value" placeholder="Email Address" />
  </div>
  <br>
  <div class="field">
    <mb-input label="Address" textarea path="contact[0]address[0].text" placeholder="Full Address"/>
  </div>
  <br>
  <div class="field">
    <mb-context type="Address" path="contact[0]address[0].use" bind="home" />
  </div>
  <div class="field">
    <mb-context type="Address" path="contact[0]address[0].type" bind="physical" />
  </div>
  <div class="field" >
    <mb-input type="Address" path="contact[0]address[0].line[0]" placeholder="Line 1" />
  </div>
  <br>
  <div class="field" >
    <mb-input type="Address" path="contact[0]address[0].line[1]" placeholder="Line 2" />
  </div>
  <br>
  <div class="field">
    <mb-input type="Address" path="contact[0]address[0].city" placeholder="City"/>
  </div>
  <br>
  <div class="field">
    <mb-input type="Address" path="contact[0]address[0].state" placeholder="State" />
  </div>
  <br>
  <div class="field">
    <mb-input type="Address" path="contact[0]address[0].postalCode" placeholder="Postal Code" />
  </div>
  <br>
  <div class="field">
    <mb-input type="Address" path="contact[0]address[0].country" placeholder="Country" />
  </div>
  <br>
  <div>
    <mb-submit>
      <sl-button {loading} class="text-blue-600 text-4xl font-bold" type="info">Submit</sl-button>
    </mb-submit>
  </div>
</mb-fhir-form>
