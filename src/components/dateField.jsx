import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useField } from 'formik';

export const DatePickerField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleDateChange = (event) => {
    const { value } = event.target;
    helpers.setValue(value);
  };

  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel>{label}</FormLabel>
      <Input {...field} {...props} onChange={handleDateChange} w={{ base: '180px', md: '400px', lg: '400px' }} type='date' size={"md"} variant={"flushed"} color={"black"} borderBottom={"1px solid"} borderColor={"#D5AD18"} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};