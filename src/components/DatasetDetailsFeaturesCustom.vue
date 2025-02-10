<template>
    <!-- Alle Attribute und Props weiterreichen -->
    <dataset-details-features v-bind="$attrs">
        <template #after="{ dataset }">
            <div class="mt-2 flex-column dsd-feature w-100">
            <div>               <!--Change the title-->
                <dataset-details-feature-header title="Custom Section"
                :arrowDown="!isDisplayed" tag="keywords-toggle" :onClick="() => isDisplayed = !isDisplayed" />
                </div>
                <div v-if="isDisplayed" class="row mt-4 w-100">
                  <div class="col-11 offset-1">
                    <div>This is some custom content</div>
                    <div class="rounded bg-dark overflow-auto" style="max-height: 300px;max-width: 100%">
                      <pre style="white-space: pre-wrap;"><code class="text-light">{{ JSON.stringify(dataset, null, 2) }}</code></pre>
                    </div>
                  </div>
                </div>
            </div>
        </template>
    </dataset-details-features>
</template>
  
  <script>
  import {
    DatasetDetailsFeatures,
    DatasetDetailsFeatureHeader,
  } from "@piveau/piveau-hub-ui-modules";
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "DatasetDetailsFeaturesCustom",
    data() {
      return {
        isDisplayed: true,
      }
    },
    components: {
      DatasetDetailsFeatures,
      DatasetDetailsFeatureHeader,
    },
  })
  </script>
  