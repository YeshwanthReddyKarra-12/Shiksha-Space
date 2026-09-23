const Course = require("../models/course");

// async function createCourse(req, res) {
//     try {
//         const course = await Course.create(req.body);
//         res.status(201).json(course);
//     } catch (error) {
//         res.status(400).json({ message: error.message || "Failed to create course" });
//     }
// }

// async function getCourses(req, res) {
//     try {
//         const courses = await Course.find();
//         res.status(200).json(courses);
//     } catch (error) {
//         res.status(500).json({ message: error.message || "Failed to fetch courses" });
//     }
// }

// async function getCourseById(req, res) {
//     try {
//         const course = await Course.findById(req.params.id);
//         if (!course) {
//             return res.status(404).json({ message: "Course not found" });
//         }
//         res.status(200).json(course);
//     } catch (error) {
//         res.status(500).json({ message: error.message || "Failed to fetch course" });
//     }
// }

// async function updateCourse(req, res) {
//     try {
//         const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true
//         });
//         if (!course) {
//             return res.status(404).json({ message: "Course not found" });
//         }
//         res.status(200).json(course);
//     } catch (error) {
//         res.status(400).json({ message: error.message || "Failed to update course" });
//     }
// }

// async function deleteCourse(req, res) {
//     try {
//         const course = await Course.findByIdAndDelete(req.params.id);
//         if (!course) {
//             return res.status(404).json({ message: "Course not found" });
//         }
//         res.status(200).json({ message: "Course deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message || "Failed to delete course" });
//     }
// }

// module.exports = {
//     createCourse,
//     getCourses,
//     getCourseById,
//     updateCourse,
//     deleteCourse
// };


async function getCourses(req, res) {
    try {
        const courses = await Course.find();

        return res.status(200).send(courses);

    } catch (error) {
        return res.status(500).send({ 
            message: "Unable to fetch courses" });
    }
}

async function createCourse(req, res) {
    try {
        const {title, description, category,level, price,duration} = req.body

        if(!title || !description || !category || !level || price == undefined || !duration){
            return res.status(400).send({
                message: "All fields are required" 
            })
        }

        const existingCourse = await Course.findOne({ title: title })

        if(existingCourse){
            return res.status(400).send({
                message: "Bad Request: Course already exists"
            })
        }

        const course =new Course({
            title:title,
            description:description,
            category:category,
            level:level,
            price:price,
            duration:duration
        });

        await course.save();

        return res.status(200).send({
            message: "Course created successfully",
        
        });
    } catch (error) {
        return res.status(500).send({ 
            message: "Unable to create course" 
        });
    }
}
