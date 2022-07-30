import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision";

describe("Indecision Unit Testing", () => {
  let component;

  // Mock fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: "yes",
          forced: false,
          image: "https://yesno.wtf/assets/yes/2.gif",
        }),
    })
  );

  beforeAll(() => {
    component = shallowMount(Indecision);
  });

  test("snapshot should matched", () => {
    expect(component.html()).toMatchSnapshot();
  });
  test("write in the input shouldn't trigger the getAnswer method", async () => {
    const getAnswerSpy = jest.spyOn(component.vm, "getAnswer");
    const input = component.find("input");
    await input.setValue("Hi world");
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });
  test("write the question mark (?) should trigger the getAnswer method", async () => {
    const getAnswerSpy = jest.spyOn(component.vm, "getAnswer");
    const input = component.find("input");
    await input.setValue("Hi world?");
    expect(getAnswerSpy).toHaveBeenCalledTimes(1);
  });
  test("getAnswer method", async () => {
    await component.vm.getAnswer();
    expect(component.vm.answer).toBe("yes");
  });
  test("getAnswer method - API Failed", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));
    await component.vm.getAnswer();
    expect(component.vm.answer).toBe("The API couldn't be loaded");
  });
});
