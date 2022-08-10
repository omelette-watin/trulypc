import {
  companyNameValidator,
  emailValidator,
  firstNameValidator,
  lastNameValidator,
  phoneValidator,
} from "@/validators"
import cn from "@/web/cn"
import FormFieldEmail from "@/web/components/business/FormFieldEmail"
import FormFieldPhone from "@/web/components/business/FormFieldPhone"
import Button from "@/web/components/system/Button"
import Row from "@/web/components/system/Row"
import FormField from "@/web/components/system/FormField"
import Heading from "@/web/components/system/Heading"
import SubmitButton from "@/web/components/system/SubmitButton"
import { UIProps } from "@/web/typed"
import { Form, Formik, FormikHelpers } from "formik"
import { FC } from "react"
import { object } from "yup"

const defaultInitialValues = {
  companyName: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
}
const validationSchema = object().shape({
  companyName: companyNameValidator.required(),
  firstName: firstNameValidator.required(),
  lastName: lastNameValidator.required(),
  email: emailValidator.required(),
  phone: phoneValidator.required(),
})

export type Values = typeof defaultInitialValues

const CreatePartnerForm: FC<
  UIProps<
    {
      initialValues?: Values
      validationSchema?: typeof validationSchema
      onSubmit: (
        values: Values,
        helpers?: FormikHelpers<Values>,
      ) => void | Promise<void>
      onCancel: () => void
    },
    "form",
    "onSubmit"
  >
> = (props) => {
  const {
    initialValues = defaultInitialValues,
    onSubmit,
    onCancel,
    children,
    ...otherProps
  } = props

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Form {...cn("flex flex-col gap-4", otherProps)}>
        {children}
        <Heading level={2} size="sm">
          About the company
        </Heading>
        <FormField label="Company name" name="companyName" />
        <Heading level={2} size="sm" className="mt-4">
          Main contact information
        </Heading>
        <Row>
          <FormField label="First name" name="firstName" />
          <FormField label="Last name" name="lastName" />
        </Row>
        <FormFieldEmail name="email" />
        <FormFieldPhone name="phone" />
        <div className="mt-4 flex items-center justify-between">
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <SubmitButton noMargin>Create</SubmitButton>
        </div>
      </Form>
    </Formik>
  )
}

export default CreatePartnerForm
