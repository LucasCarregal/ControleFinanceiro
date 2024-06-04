<?php

namespace App\Http\Controllers;

use App\Http\Resources\DespesasResource;
use App\Models\Despesa;
use App\Traits\httpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DespesaController extends Controller
{
    use httpResponses;

    protected $user;

    public function __construct()
    {
        $this->user = auth()->user();
    }

    public function index()
    {
        return $this->response('Lista de despesas do Usuario', 200, DespesasResource::collection(Despesa::where('user_id', $this->user->id)->get()));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $despesas = $request->all();

        if (!is_array($despesas))
            return $this->error('A(s) despesa(s) deve(m) ser enviada(s) em formato de array', 400);

        // validando os dados de entrada
        foreach ($despesas as $key => $despesa) {
            $despesa['user_id'] = $this->user->id;
            $validator = Validator::make($despesa, [
                'nome' => 'required',
                'valor' => 'required|numeric',
                'data' => 'required|date_format:Y-m-d|before:' . date('Y-m-d', time()),
                'categoria' => 'nullable',
                'user_id' => 'required'
            ]);

            if ($validator->fails())
                return $this->error('Dados do indice ' . $key . 'são invalidos', 442, $validator->errors());
        }

        $retorno = array();
        // Inseri os registro no banco e prepara retorno
        foreach ($despesas as $key => $despesa) {
            $retorno[] = new DespesasResource(Despesa::create($despesa));
        }

        return $this->response('Despesa(s) cadastradas com Sucesso', 200, $retorno);
    }

    /**
     * Display the specified resource.
     */
    public function show(Despesa $despesa)
    {
        if ($despesa->user_id !== $this->user->id)
            return $this->error('Despesa consultada não pertence ao usuario', 403);

        return $this->response('Despesa especifica consultada do usuario', 200, new DespesasResource($despesa));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Despesa $despesa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Despesa $despesa)
    {
        //
    }
}
