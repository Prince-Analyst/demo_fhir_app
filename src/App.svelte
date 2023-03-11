<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import PatientRegistration from './Registration/PatientRegistration.svelte';
  import PractitionerRegistration from "./Registration/PractitionerRegistration.svelte";
  import OrganizationRegistration from "./Registration/OrganizationRegistration.svelte";
  import SignUp from "./Registration/SignUp.svelte";
  import Layout from "./Layout.svelte";
  import PatientList from "./resourceList/PatientList.svelte";
  import PractitionerList from './resourceList/PractitionerList.svelte';
  import OrganizationList from './resourceList/OrganizationList.svelte';

</script>

<Router>
  <Layout>
    <!-- <Route path="/" component={SignUp} /> -->
    <Route path="patients" component="{PatientList}" />
    <Route path="practitioners" component="{PractitionerList}" />
    <Route path="organizations"  component="{ OrganizationList }" />
    <Route path="patient"  component="{ PatientRegistration }" />
    <Route path="practitioner"  component="{ PractitionerRegistration }" />
    <Route path="organization"  component="{ OrganizationRegistration }" />
    <Route path="patient/:id"  component="{ PatientRegistration }" />
    <Route path="practitioner/:id"  component="{ PractitionerRegistration }" />
    <Route path="organization/:id"  component="{ OrganizationRegistration }" />
  </Layout>
</Router>
