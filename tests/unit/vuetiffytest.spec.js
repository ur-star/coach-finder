import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Errorbar from "@/components/Errorbar.vue";
import LoginPageVue from "@/views/LoginPage.vue";

describe("Errorbar works", () => {
  let localVue;
  let vuetify;
  const msg = "new message";

  it("renders props.msg when passed", () => {
    localVue = createLocalVue(); // because of vuetify, we should use a localVue instance
    vuetify = new Vuetify();
    let wrapper = mount(Errorbar, {
      localVue,
      vuetify,

      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

// describe("Login page ", () => {
//   let localVue = createLocalVue();
//   let vuetify = new Vuetify();
//   it("removes login page after login", () => {
//     let wrapper = mount(LoginPageVue, {
//       localVue,
//       vuetify,

//       methods: {
//         signInWithEmailAndPassword() {
//         },
//       },
//     });
//     expect(wrapper.exists()).toBeFalsy();
//   });
// });
