const app = Vue.createApp({
  created() {
    // this.text = 'The component is now created';
    // let valueFromSessionStorage = sessionStorage.getItem('x')
    console.log(localStorage.getItem("x"));
    // localStorage.clear();
    if (localStorage.getItem("x")) {
      this.savedItems = JSON.parse(localStorage.getItem("x"));
      this.savedName = JSON.parse(localStorage.getItem("y"));
    }
  },
  data() {
    return {
      text: "",
      items: [],
      savedItems: [],
      newItem: "",
      newSavedItem: "",
      savedName: [],
    };
  },
  methods: {
    addItem(item) {
      this.items.push(item);
      this.newItem = "";
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    removeSavedItem(index) {
      this.savedName.splice(index, 1);
      this.savedItems.splice(index, 1);
      localStorage.setItem("x", JSON.stringify(this.savedItems));
      localStorage.setItem("y", JSON.stringify(this.savedName));
    },
    saveItems(item) {
      this.savedItems.push(this.items);
      if (this.newSavedItem !== "") {
        this.savedName.push(this.newSavedItem);
      } else {
        this.savedName.push(item);
      }
      this.newSavedItem = "";
      this.items = [];
      localStorage.setItem("x", JSON.stringify(this.savedItems));
      localStorage.setItem("y", JSON.stringify(this.savedName));
    },
    renderSavedItems(arr, index) {
      this.items = [];
      if (arr[index] !== undefined) {
        arr[index].forEach((i) => this.addItem(i));
      }
    },
  },
});

app.component("inputForm", {
  data() {
    return { inputValue: this.inputItem, newItem: "" };
  },
  methods: {
    onSubmit() {
      if (this.buttonValue === "Lägg till") {
        this.$emit("submit-method", this.newItem);
        this.newItem = "";
      } else if (this.buttonValue === "Spara") {
        this.$emit("save-method", this.newItem);
        this.newSavedItem = "";
        this.newItem = "";
      }
    },
  },
  props: {
    placeholderName: String,
    buttonValue: String,
    inputId: String,
    idName: String,
    inputItem: String,
  },
  template: `
   <form @submit.prevent="onSubmit" :id="idName" class="inpuFields">
        <input
          type="text"
          :id="inputId"
          name="item"
          :placeholder="placeholderName"
          required
          v-model="newItem"
        />
        <input type="submit" class="inputBtn" :value="buttonValue">
      </form>
  `,
});

app.mount("#app");
