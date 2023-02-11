<script lang="ts">
  import axios from 'axios';
  import { Router, Link, Route } from "svelte-routing";
  import PatientRegistration from './PatientRegistration.svelte';
  import Layout from "./Layout.svelte";
  import List from "./List.svelte";

</script>

<Router>
  <Layout>
    <Route path="/" component="{List}" />
    <Route path="patient"  component="{ PatientRegistration }" />
    <Route path="patient/:id"  component="{ PatientRegistration }" />
  </Layout>
</Router>
