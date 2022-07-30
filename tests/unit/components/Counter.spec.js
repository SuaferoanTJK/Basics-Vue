import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter";
import { findByTestAttr } from "../utils";

describe("Counter Unit Testing", () => {
  let component;
  beforeAll(() => {
    component = shallowMount(Counter);
  });

  test("snapshot should matched", () => {
    expect(component.html()).toMatchSnapshot();
  });
  test("customTitle should have the default value of 'Counter'", () => {
    const customTitle = findByTestAttr(component, "title").text();
    expect(customTitle).toBe("Counter");
  });
  test("exp should have the default value of '3'", () => {
    const exp = findByTestAttr(component, "counter").text().split(" ")[1];
    expect(exp).toBe("3");
  });
  test("counter should have the default value of '100'", () => {
    const counter = findByTestAttr(component, "counter").text().split(" ")[0];
    expect(counter).toBe("100");
  });
  test("counter must increase or decrease by 1", async () => {
    const wrapper = shallowMount(Counter);
    const [decreaseBtn, increaseBtn] = wrapper.findAll("button");
    await increaseBtn.trigger("click");
    await decreaseBtn.trigger("click");
    await decreaseBtn.trigger("click");
    await decreaseBtn.trigger("click");
    const counter = findByTestAttr(wrapper, "counter").text().split(" ")[0];
    expect(counter).toBe("98");
  });
  test("must establish the default value for prop counter", () => {
    const { start } = component.props();
    const counter = findByTestAttr(component, "counter").text().split(" ")[0];
    expect(Number(counter)).toBe(start);
  });
  test("should display the prop title", () => {
    const title = "Hi World";
    const component = shallowMount(Counter, { props: { title } });
    const customTitle = findByTestAttr(component, "title").text();
    expect(customTitle).toBe(title);
  });
});
