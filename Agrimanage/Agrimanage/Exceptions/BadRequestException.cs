using System.Net;

namespace Agrimanage.Exceptions
{
    public class BadRequestException : BaseException
    {
        public BadRequestException(string message) : base(message, null, HttpStatusCode.BadRequest)
        {
        }
    }
}
