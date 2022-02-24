<template>
  <div>
    <div v-if="isReady">
      <vue-good-table :columns="columns" :rows="rows" />
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
      columns: [
        {
          label: "conferenceOrganizer",
          field: "conferenceOrganizer",
        },
        {
          label: "conferenceName",
          field: "conferenceName",
        },
        {
          label: "conferenceYear",
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
          //   this.jsonData = response.data;
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

      console.log("data compiled and passing to rows");
      console.log(eventData);

      this.rows = eventData;
    },
  },
};
</script>

<style>
</style>