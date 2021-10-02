import * as Yup from 'yup';

export const initialValues = {
    title: '',
    content: '',
    excerpt: '',
    score: 0,
    director: '',
    actors: [],
    status: 'draft',
}

export const validationSchema = () => (
    Yup.object({
        title: Yup.string().required('Sorry the title is required'),
        content: Yup.string().required('Sorry the content is required').min(50, '50 is minimum amount of characters'),
        excerpt: Yup.string().required('Sorry the excerpt is required').max(500, '500 is maximum amount of characters'),
        score: Yup.number().min(0, 'Sorry zero is minimum').max(100, 'Sorry 100 is maximum').required('Sorry the score is required'),
        director: Yup.string().required('Sorry the director is required'),
        actors: Yup.array().min(3, 'Minimum 3 actors is required').required('Actors is required'),
        status: Yup.string().required('Sorry the status is required'),
    })
);

export const statusList = [
    {
        value: '',
        label: 'None'
    },
    {
        value: 'draft',
        label: 'Draft'
    },
    {
        value: 'public',
        label: 'Public'
    },
]