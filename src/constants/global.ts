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

export const statusOptions = [
  {
    value: "UPCOMING",
    label: "Upcoming"
  },
  {
    value: "ONGOING",
    label: "Ongoing"
  },
  {
    value: "ENDED",
    label: "Ended"
  },
]

export const daysOption = [
  { value: 'Mon', label: 'Monday' },
  { value: 'Tue', label: 'Tuesday' },
  { value: 'Wed', label: 'Wednesday' },
  { value: 'Thu', label: 'Thursday' },
  { value: 'Fri', label: 'Friday' },
  { value: 'Sat', label: 'Saturday' },
  { value: 'Sun', label: 'Sunday' },
];

export const startTimeOptions = [
  { value: '08:00', label: '08:00 AM' },
  { value: '08:50', label: '08:50 AM' },
  { value: '09:40', label: '09:40 AM' },
  { value: '10:50', label: '10:50 AM' },
  { value: '11:40', label: '11:40 AM' },
  { value: '12:30', label: '12:30 PM' },
  { value: '14:30', label: '02:30 PM' },
  { value: '15:20', label: '03:20 PM' },
  { value: '16:10', label: '04:10 PM' },
]
export const endTimeOptions = [
  { value: '08:50', label: '08:50 AM' },
  { value: '09:40', label: '09:40 AM' },
  { value: '10:50', label: '10:50 AM' },
  { value: '11:40', label: '11:40 AM' },
  { value: '12:30', label: '12:30 pm' },
  { value: '14:30', label: '02:30 pm' },
  { value: '15:20', label: '03:20 pm' },
  { value: '16:10', label: '04:10 pm' },
  { value: '17:00', label: '05:00 pm' },
]

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
