import { SingleLineInput } from "..";
import { Button } from "../../atoms";
import { Stack } from "../../layouts";
import { Direction } from "../../model";

import { Form, IFormProps } from ".";

const Template = (args) => <Form {...args} />;

export default {
  component: Form,
  title: "Molecules/Form",
};

export const Default = {
  render: Template.bind({}),
  name: "Default",
  args: {},
};

export const Simple = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    return (
      <Form isLoading={isLoading} onFormSubmitted={() => setValue("")}>
        <SingleLineInput
          placeholderText="Enter Message"
          value={value}
          onValueChanged={setValue}
          messageText="Button is disabled"
        />
        <br />
        <Button
          type="submit"
          isEnabled={false}
          variant="primary"
          text="Submit"
        />
      </Form>
    );
  },

  name: "Simple",
};

export const Loading = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);

    return (
      <Form isLoading={isLoading} onFormSubmitted={() => setValue("")}>
        <Stack direction={Direction.Verticl} shouldAddGutter={true}>
          <SingleLineInput
            placeholderText="Enter Message"
            value={value}
            onValueChanged={setValue}
          />
          <SingleLineInput
            placeholderText="Enter Other message"
            value={value}
            onValueChanged={setValue}
            messageText="Button is disabled"
          />
          <br />
          <Button
            type="submit"
            isEnabled={false}
            variant="primary"
            text="Submit"
          />
        </Stack>
      </Form>
    );
  },

  name: "Loading",
};
