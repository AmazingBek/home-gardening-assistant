exports.home = (req, res) => {
    res.render('index', { title: 'Home Gardening Assistant', message: 'This web application was created to fulfill Web Technology module’s requirements and does not represent an actual company or service.' });
};