import Application from "../models/application.model.js";
import Company from "../models/company.model.js";
import Job from "../models/job.model.js";
import mongoose from "mongoose";

//for recruiter
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      companyId,
    } = req.body;

    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !companyId
    ) {
      return res.status(401).json({
        msg: "Some inputs are missing",
        success: false,
      });
    }

    const company = await Company.findById(companyId);
    if (!company || company.userId != userId) {
      return res.status(401).json({
        msg: "Invalid Company Id",
        success: false,
      });
    }

    const job = await Job.create({
      title: title,
      description: description,
      requirements: requirements.split(","),
      salary: salary,
      location: location,
      jobType: jobType,
      experience: experience,
      company: companyId,
      createdBy: userId,
      applications: [],
    });

    return res.status(200).json({
      msg: "Job created.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// for students

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        msg: "No job found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// for students
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({ path: "company" });

    if (!job) {
      return res.status(404).json({
        msg: "This job doesn't exists",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (e) {
    console.log(e.message);
  }
};

//for recruiter

export const getRecruiterJobs = async (req, res) => {
  try {
    const userId = req.id;

    const jobs = await Job.find({ createdBy: userId }).populate({
      path: "company",
    });
    if (!jobs) {
      return res.status(404).json({
        msg: "No jobs found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteRecuiterJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
    });
    if (!job) {
      return res.status(404).json({
        msg: "Job not found",
        success: false,
      });
    }
    const applications = job.applications;

    if (applications.length > 0) {
      // Use for...of to await async deletions
      for (const application of applications) {
        const deletedApplication = await Application.findByIdAndDelete(
          application._id
        );
        if (!deletedApplication) {
          throw new Error("Error in deleting applications");
        }
      }
    }
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob)
      return res.status(500).json({
        msg: "Some error occured while deleting",
        success: false,
      });

    return res.status(200).json({
      msg: "Job Deleted successfully ",
      success:true
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
        msg: "Server error",
        success: false,
      });
  }
};
