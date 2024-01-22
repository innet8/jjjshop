<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2023 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace app\admin\middleware;

use Closure;
use think\App;
use think\Request;
use think\Session;
use think\Response;
use think\facade\Env;

/**
 * Session初始化
 */
class CheckEnvironment
{
    public function __construct(protected App $app, protected Session $session)
    {
    }

    /**
     * Session初始化
     * @access public
     * @param Request $request
     * @param Closure $next
     */
    public function handle(Request $request, Closure $next) : Response
    {
        if (!Env::get('OPEN_ADMIN', false)) {
            die;
        }
        return $next($request);
    }

    public function end(Response $response): void
    {
        $this->session->save();
    }
}
