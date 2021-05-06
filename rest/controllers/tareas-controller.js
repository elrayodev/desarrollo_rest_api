const Tarea = require("../models/tarea");

function createTarea(req, res){
    let tarea = new Tarea({
        id: req.body.id,
        name: req.body.name,
        puntos: req.body.puntos,
        materia: req.body.materia,
        fechaEntrega: req.body.fechaEntrega,
        fechaCreacion: req.body.fechaCreacion,
    });

    tarea.save((err, result) => {
        if(err){
            return res.status(500).json({
                error: true,
                message: "Server error",
                code: 0
            });
        }

        if(!result){
            return res.status(400).json({
                error: true,
                message: "Client error",
                code: 20
            });
        }

        return res.status(200).json({
            error: false,
            message:"Success",
            data: result,
            code:10
        });

    });

}; // Fin de la función crear tarea en la bd

function updateTarea(req, res) {
    const tarea_id = req.params.id
    const data = req.body;

    Tarea.findByIdAndUpdate(tarea_id, data, {new: true}, (err, result) => {
        if(err){
            return res.status(500).json({
                error: true,
                message: "Server error",
                code: 0
            });
        }

        if(!result){
            return res.status(400).json({
                error: true,
                message: "ID Not Found",
                code: 20
            });
        }

        return res.status(200).json({
            error: false,
            message:"Success",
            data: result,
            code:10
        });

    });

}; // Fin de función update

function getAllTareas(req, res){

    Tarea.find().exec( (err, tareas) => {
        if(err){
            return res.status(500).json({
                error: true,
                message: "Server error",
                code: 0
            });
        }

        return res.status(200).json({
            error: false,
            message:"Success",
            data: tareas,
            code:10
        });
    });

}

function deleteTarea(req, res) {

    const tarea_id = req.params.id;

    Tarea.findOneAndDelete({id: tarea_id}, (err, result) => {
        if(err){
            return res.status(500).json({
                error: true,
                message: "Server error",
                code: 0
            });
        }

        if(!result){
            return res.status(400).json({
                error: true,
                message: "ID Not Found",
                code: 20
            });
        }

        return res.status(200).json({
            error: false,
            message:"Success",
            data: result,
            code:10
        });

    });

}

module.exports = {
    createTarea,
    updateTarea,
    getAllTareas,
    deleteTarea
};