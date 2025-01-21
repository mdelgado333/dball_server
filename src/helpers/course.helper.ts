import { Course } from '../models/Course.model'

export const createCourse = (values: Record<string, any>) => new Course(values)
    .save().then((course) => course.toObject())
export const getCourseById = (id: string) => Course.findById(id)
export const getCourses = () => Course.find()
export const updateCourseById = (id: string, values: Record<string, any>) => Course.findByIdAndUpdate(id, values)
export const deleteCourseById = (id: string) => Course.findOneAndDelete({ _id: id })