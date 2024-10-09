export const checkRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.userRole;
        if (!roles.includes(userRole)) {
            return res.status(403).json({ msg: 'Permisos insuficientes' });
        }
        next();
    };
};