export default class ErrorController {
  handleError(req, res, next) {
    res.status(404).json({
      'message': 'Endpoint não encontrado.',
      'error': 'NotFound'
    });
  }
}