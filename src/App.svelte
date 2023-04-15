<script lang="ts">
	import SignIn from './components/SignIn.svelte';
  import { Router, Route } from "svelte-routing";
  import PatientRegistration from './components/PatientRegistration.svelte';
  import PractitionerRegistration from './components/PractitionerRegistration.svelte';
  import OrganizationRegistration from './components/OrganizationRegistration.svelte';
  import Layout from "./Layout.svelte";
  import AllPatientList from './components/AllPatientList.svelte';
  import PatientList from './components/PatientList.svelte';
  import PractitionerList from './components/PractitionerList.svelte';
  import OrganizationList from './components/OrganizationList.svelte';
  import Admission from './components/Admission.svelte';
  import AdmissionList from './components/AdmissionList.svelte';
  import Assessment from './components/Assessment.svelte';
  import CovidResult from './components/CovidResult.svelte';
  import Donation from './components/Donation.svelte';
  import PatientBanner from './components/PatientBanner.svelte';
  import Overview from './components/Overview.svelte';
  import HomePageList from './components/HomePageList.svelte';
  import Home from './components/Home.svelte';

</script>

<Router>
  <Layout>
    <Route path="/" component="{ Home }" />
    <Route path="signin" component="{ SIgnIn }"/>
    <Route path="assessment" component="{ Assessment }"/>
    <Route path="allpatients" component="{ AllPatientList }" />
    <Route path="covidresult" component="{ CovidResult }"/>
    <Route path="donation" component="{ Donation }"/>
    <Route path="patients" component="{ PatientList} "/>
    <Route path="overview" component="{ Overview }"/>
    <Route path="homepagelist" component="{ HomePageList }"/>
    <Route path="patientbanner" component="{ PatientBanner }"/>
    <Route path="practitioners" component="{ PractitionerList }" />
    <Route path="organizations"  component="{ OrganizationList }" />
    <Route path="patient"  component="{ PatientRegistration }" />
    <Route path="admission" component="{ Admission }" />
    <Route path="admissions" component="{ AdmissionList }"/>
    <Route path="practitioner"  component="{ PractitionerRegistration }" />
    <Route path="organization"  component="{ OrganizationRegistration }" />
    <Route path="patient/:id"  component="{ PatientRegistration }" />
    <Route path="practitioner/:id"  component="{ PractitionerRegistration }" />
    <Route path="organization/:id"  component="{ OrganizationRegistration }" />
  </Layout>
</Router>
