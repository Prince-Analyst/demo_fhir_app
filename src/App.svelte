<script lang="ts">
  import axios from 'axios';
  import { Router, Link, Route } from "svelte-routing";
  import PatientRegistration from './PatientRegistration.svelte';
  import PractitionerRegistration from './PractitionerRegistration.svelte';
  import Layout from "./Layout.svelte";
  import PatientList from "./Registration/PatientList.svelte";
  import PractitionerList from './PractitionerList.svelte';

</script>

<Router>
  <Layout>
    <Route path="patients" component="{PatientList}" />
    <Route path="patient"  component="{ PatientRegistration }" />
    <Route path="patient/:id"  component="{ PatientRegistration }" />
    <Route path="practitioners" component="{PractitionerList}" />
    <Route path="practitioner"  component="{ PractitionerRegistration }" />
    <Route path="practitioner/:id"  component="{ PractitionerRegistration }" />
  </Layout>
</Router>
