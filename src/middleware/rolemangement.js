const isSuperAdmin = async (req, res, next) => {
    try {
        const user = req.user;
        
        if (!user) {
            return res.status(401).json({ error: "Unauthorized user" });
        }
        if (user.role !== "superadmin") {
            return res.status(403).json({ error: "Forbidden! Super admin access is required" });
        }
        
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: "Access denied, invalid token.",
        });
    }
};

const admin = async (req, res, next) => {
    try {
        const user = req.user;        
        if (!user) {
            return res.status(401).json({ error: "Unauthorized user" });
        }
        
        if (user.role !== "admin") {
            return res.status(403).json({ error: "Forbidden! Admin access is required" });
        }
        
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "failed",
            message: "Access denied, invalid token.",
        });
    }
};



const isBothAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized user" });
    }

    
    if (user.role !== "superadmin" && user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden! Admin access is required" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Access denied, invalid token.",
    });
  }
};


module.exports = { isSuperAdmin, admin, isBothAdmin };

