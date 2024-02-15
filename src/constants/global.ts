export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const genders = ['Female', 'Male', 'Others']

export const bloods = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-']

export const designations = ['Lecture', 'Assistant professor', 'Associate professor', 'Professor', 'Professor emeritus']

export const monthOptions = monthNames.map((item) => ({
  value: item,
  label: item,
}));

export const gendersOptions = genders.map((item) => ({
  value: item,
  label: item
}))

export const bloodOptions = bloods.map((item) => ({
  value: item,
  label: item
}))

export const designationOptions = designations.map((item) => ({
  value: item,
  label: item
}))
