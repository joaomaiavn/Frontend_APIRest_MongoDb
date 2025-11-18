const router = require("express").Router();

const Person = require("../models/Person");

// Create - criação de dados

router.post("/", async (req, res) => {
    // req.body
    //{ name: 'João', salary: 5000, approved: true  }
    const { name, salary, approved, email, phone } = req.body;

    if (!name) {
        res.status(422).json({ error: "O nome é obrigatório!" });
        return;
    }

    const person = {
        name,
        salary,
        approved,
        email,
        phone,
    };

    try {
        // criando dados
        const createdPerson = await Person.create(person);
        // retorna o documento criado para o frontend usar diretamente
        res.status(201).json(createdPerson);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Read - leitura de dados

router.get("/", async (req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);

    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get("/:id", async (req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id;

    try {
        const person = await Person.findOne({ _id: id });

        if (!person) {
            res.status(422).json({ message: "Pessoa não encontrada!" });
            return;
        }

        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({ error: error });
    }

});

// Update - atualização de dados (PUT, PATCH)

router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    
    const { name, salary, approved, email, phone } = req.body;
    
    const person = {
        name,
        salary,
        approved,
        email,
        phone,
    };

    if (!name) {
        res.status(422).json({ error: "O nome é obrigatório!" });
        return;
    }

    try {
        // retorna o documento atualizado
        const updatedPerson = await Person.findOneAndUpdate({ _id: id }, person, { new: true });

        if (!updatedPerson) {
            res.status(422).json({ message: "Pessoa não encontrada!" });
            return;
        }

        res.status(200).json(updatedPerson);
        
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Delete - deletar dados

router.delete("/:id", async (req, res) => {

    const id = req.params.id;

    const person = await Person.findOne({ _id: id });

    if (!person) {
        res.status(422).json({ message: "Pessoa não encontrada!" });
        return;
    }

    try {

        await Person.deleteOne({ _id: id });
        res.status(200).json({ message: "Pessoa removida com sucesso!" });

    } catch (error) {
        res.status(500).json({ error: error });
    }

});

module.exports = router;

