<template>
  <div>
    <div v-if="isReady">
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :pagination-options="tableOptions"
        styleClass="vgt-table striped"
      />
    </div>

    <div v-else>
      <h2>There should be data here.</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GoodTable",

  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      isReady: false,
      tableOptions: {
        enabled: true,
        mode: "records",
        position: "both",
        perPage: 40,
      },
      columns: [
          // TODO: add filters
          // https://xaksis.github.io/vue-good-table/guide/configuration/column-filter-options.html#trigger

        {
          label: "Org",
          field: "conferenceOrganizer",
        },
        {
          label: "conference",
          field: "conferenceName",
        },
        {
          label: "Year",
          field: "conferenceYear",
          type: "number",
        },
        {
          label: "title",
          field: "presentationTitle",
        },
        {
          label: "author",
          field: "presentationAuthor",
        },
        {
          label: "duration",
          field: "presentationDuration",
        },
        {
          label: "link",
          field: "presentationLink",
          html: true,
        },
      ],
      rows: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      if (!this.isReady) {
        axios.get(`${this.baseUrl}/data.json`).then((response) => {
          this.createRowData(response.data);
          this.isReady = true;
        });
      }
    },
    createRowData(response) {
      let eventData = [];

      // top level
      for (const key in response) {
        const mainEvent = response[key];
        console.log("mainEvent");
        console.log(mainEvent);

        for (const event in mainEvent) {
          const presentation = mainEvent[event];

          if (typeof presentation === "object") {
            eventData.push({
              conferenceOrganizer: mainEvent.conferenceOwner,
              conferenceName: mainEvent.conference,
              conferenceYear: mainEvent.year,
              presentationTitle: presentation.title,
              presentationAuthor: presentation.author,
              presentationDuration: presentation.duration,
              presentationLink: `<a class="outbound-link" href="${presentation.shortUrl}">video</a>`,
            });
          }
        }
      }

      console.log("data compiled and passing to rows");
      console.log(eventData);

      this.rows = eventData;
    },
  },
};
</script>

<style>
</style>