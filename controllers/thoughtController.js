const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  
  // Thought Controller Functions
  getThoughtById(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) => thought ? res.json(thought) : res.status(404).json({ message: 'No thought found' }))
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) =>
        User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true })
      )
      .then(() => res.json({ message: 'Thought created successfully!' }))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
      .then(() => res.json({ message: 'Thought deleted' }))
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  removeReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { new: true }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  }
};
