import Job from "../models/job.model.js";
import Application from "../models/application.model.js";



export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if(!userId){
      return res.status(401).json({
        msg:'User not authenticated',
        success:false
      });
    }
    if (!jobId) {
      return res.status(400).json({
        msg: "Job is required",
        success: false,
      });
    }
    // job is present or not
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        msg: "Job not found",
        success: false,
      });
    }

    // check already applied or not

    const existingApplication = await Application.findOne({
      applicant: userId,
      job: jobId,
    });
    if (existingApplication) {
      return res.status(401).json({
        msg: "Already Applied",
        success: false,
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(200).json({
      msg: "Applied Successfully",
      success: true,
    });
  } catch (e) {
    console.log(e.message);
  }
};

// all  jobs  user applied for
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        populate: {
          path: "company"
        },
      })
      .sort({ createdAt: -1 });

    if (!applications) {
      return res.status(404).json({
        msg: "No Application found",
        success: false,
      });
    }
    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (e) {
    console.log(e.message);
  }
};

// check all applications for job

export const getApplications = async (req, res) => {
  try {
    // get jobId for which job to check
    const jobId = req.params.id;
    const userId = req.id;

    const job = await Job.find({_id:jobId, createdBy:userId}).populate(
        {
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        }
    );
    
    if(!job){
        return res.status(404).json({
            msg: "Enter valid JobId",
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

export const updateStatus = async (req,res) =>{
    try{
        const {status} = req.body;
        const applicationId = req.params.id;
        const userId = req.id;
        if(!status){
            return res.status(400).json({
                msg:"Invalid status",
                success: false,
              });
        }

        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                msg:"No application found",
                success: false,
              });
        }
        const job = await Job.findById(application.job);

        if(!job || job.createdBy != userId){
          return res.status(404).json({
            msg:"Not Authorized to perform action",
            success: false,
          });
        }
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            msg:"status updated successfully",
            success: true,
          });
    }catch(e){
        console.log(e.message);
    }
}